import { create } from "zustand";
import api from "../api/api";

export const usePostStore = create((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  getPosts: () => get().posts,
  // getFriendPosts : () => 
  createPost: async (newPost) => {
    if (!newPost.text) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await api.post("/api/posts", newPost);
    set((state) => ({ posts: [...state.posts, res.data.data] }));
    return { success: true, message: "Post created successfully!" };
  },
  fetchPosts: async () => {
    try {
      const res = await api.get("/api/posts");
      set({ posts: res.data.data });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  },
}));