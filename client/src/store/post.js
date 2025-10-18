import { create } from "zustand";

export const usePostStore = create((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  createPost: async (newPost) => {
    if (!newPost.text) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    const data = await res.json();
    set((state) => ({ posts: [...state.posts, data.data] }));
    return { success: true, message: "Post created successfully!" };
  },
  fetchPosts: async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    set({ posts: data.data });
  },
}));