import { create } from "zustand";
import api from "../api/api";

export const usePostStore = create((set) => ({
  posts: [],
  profilePosts: [],
  setPosts: (posts) => set({ posts }),
  getPosts: async () => {
    try {
      const res = await api.get("/api/posts");
      set({ posts: res.data.data || [] })
    } catch(error) {
      console.error("Error fetching post:", error);
    }
  },
  getProfilePost : async () => {
    try {
      const res = await api.get(`/api/profile`);
      if(!res.data.success) {
        throw new Error(res.data.message || 'Failed to fetch user posts');
      }

      const posts = res.data.data.postsWithUserName || []; 
      set({ posts });
    } catch (error) {
      console.error("Error fetching posts with usernames:", error);
      set({ posts: [] });
    }
  },
  getPostUserName : async () => {
    try {
      const res = await api.get(`/api/posts/post/username`);
      if(!res.data.success) {
        throw new Error(res.data.message || 'Failed to fetch user posts');
      }
      if(!res.data.data || res.data.data.length === 0) {
        throw new Error('No posts found for user');
      }
      set({ posts: res.data.data });
    } catch(error) {
      console.error("Error fetching posts with usernames:", error);
      set({ posts: [] });
    }
  },
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