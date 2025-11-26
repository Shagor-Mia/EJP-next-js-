"use server";

import { z } from "zod";
import { signIn, signOut, auth } from "./auth";
import { AuthError } from "next-auth";
import {
  createUser,
  findUserByEmail,
  createEvent,
  deleteEvent as dbDeleteEvent,
} from "./data";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type AuthState = {
  error?: string | { [key: string]: string[] | undefined };
  message?: string;
};

export async function signInWithCredentials(
  prevState: AuthState | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/manage-events" });
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export async function registerUser(
  prevState: AuthState | undefined,
  formData: FormData
) {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return { error: "An account with this email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser({ name, email, password: hashedPassword });
  } catch (e) {
    return { error: "Failed to create user." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/manage-events",
    });
    return { message: "Account created successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Login failed after registration." };
    }
    throw error;
  }
}

const EventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date."),
  priority: z.enum(["Low", "Medium", "High"]),
  category: z.string().min(2, "Category is required."),
  imageUrl: z
    .string()
    .url("Please enter a valid URL.")
    .optional()
    .or(z.literal("")),
});

export type EventState = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message?: string | null;
};

export async function addEvent(prevState: EventState, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Authentication required." };
  }

  const validatedFields = EventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    date: formData.get("date"),
    priority: formData.get("priority"),
    category: formData.get("category"),
    imageUrl: formData.get("imageUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create event. Please check the fields.",
    };
  }

  try {
    await createEvent({
      ...validatedFields.data,
      createdBy: session.user.id,
      date: new Date(validatedFields.data.date).toISOString(),
    });
  } catch (e) {
    return { message: "Database Error: Failed to Create Event." };
  }

  revalidatePath("/manage-events");
  redirect("/manage-events");
}

export async function deleteEvent(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Authentication required." };
  }

  try {
    await dbDeleteEvent(id);
    revalidatePath("/manage-events");
    return { message: "Event deleted successfully." };
  } catch (e) {
    return { error: "Database Error: Failed to Delete Event." };
  }
}
