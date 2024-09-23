import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const updatedRecipe = await prisma.recipe.findUnique({
      where: { id: Number(params.id) },
    })

    return NextResponse.json(updatedRecipe, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const updatedRecipe = await prisma.recipe.update({
      where: { id: Number(params.id) },
      data: body,
    })

    return NextResponse.json(updatedRecipe, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.recipe.delete({
      where: { id: Number(params.id) },
    })

    return NextResponse.json({}, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
