import { prisma } from "~/db.server";  

export const getCommentsByPostId = async (postId: string) => {
  return prisma.comment.findMany({
    where: { postId: postId },
    orderBy: { createdAt: "desc" },
  });
};

export const createComment = async ({
  postId,
  userId,
  content,
}: {
  postId: string;
  userId: string;
  content: string;
}) => {
  return prisma.comment.create({
    data: {
      postId,
      userId,
      content,
    },
  });
};