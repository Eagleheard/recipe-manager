import { PrismaClient } from '@prisma/client'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextApiRequest) {
  try {
    const { searchParams } = new URL(req.url || '')

    const search = searchParams.get('search') || ''
    const ingredients = searchParams.get('ingredients')?.split(',') || []
    const tags = searchParams.get('tags')?.split(',') || []

    const recipes = await prisma.recipe.findMany({
      where: {
        AND: [
          search ? { name: { contains: search, mode: 'insensitive' } } : {},
          ingredients.length > 0 ? { ingredients: { hasEvery: ingredients } } : {},
          tags.length > 0 ? { tags: { hasEvery: tags } } : {},
        ],
      },
    })

    return NextResponse.json(recipes, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log('Request body:', body)

    if (!body.name || !body.description) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const newRecipe = await prisma.recipe.create({
      data: body,
    })

    console.log('Created recipe:', newRecipe)

    return NextResponse.json(newRecipe, { status: 201 })
  } catch (error) {
    console.error('Error creating recipe:', error)

    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
