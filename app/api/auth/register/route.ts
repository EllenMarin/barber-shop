import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/app/_lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Name, email, and password are required" },
      { status: 400 },
    );
  }

  try {
    // Verifica se o email já existe
    const userExists = await db.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 },
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário no banco de dados
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Retorna a resposta de sucesso

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
