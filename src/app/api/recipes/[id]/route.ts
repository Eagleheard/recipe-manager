import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updatedRecipe = await prisma.recipe.update({
      where: { id: Number(params.id) },
      data: body,
    });
    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.recipe.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
