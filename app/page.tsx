import { prisma } from '@/lib/prisma';

export default function Page() {
  async function create(formData: FormData) {
    'use server';
    const comment = formData.get('comment');
    await prisma.category.create({
      data: {
        name: `${comment.toString()}`,
        slug: 'asd123'
      }
    });
  }

  return (
    <form action={create}>
      <input type="text" placeholder="write a comment" name="comment" />
      <button type="submit">Submit</button>
    </form>
  );
}
