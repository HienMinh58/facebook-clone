import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import { useUserStore } from '../store/user';
import { usePostStore } from '../store/post';
import PostCard from '../components/PostCard';
const Profile = () => {
    const { currentUser } = useUserStore();
    const token = localStorage.getItem('authToken');
    const [user, setUser] = useState(currentUser || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { posts, getProfilePost } = usePostStore();
    const handleLike = async (postId) => {
      if (!currentUser?.id) {
        setSnackbarMessage('Please login to like post!');
        setSnackbarOpen(true);
        return;
      }

      if (!postId || typeof postId !== 'string') {
        setSnackbarMessage('Invalid postId!');
        setSnackbarOpen(true);
        return;
      }

      try {
        const persisted = JSON.parse(localStorage.getItem("user-storage"));
        const token = persisted?.state?.token;

        const response = await fetch('/api/likes', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ postId })
        });

        const data = await response.json();
        console.log('Response status:', response.status);

        if (!response.ok) {
          setSnackbarMessage(data.message || `Error: HTTP ${response.status}`);
          setSnackbarOpen(true);
          return;
        }

        await getProfilePost();
        setSnackbarMessage(data.message || 'Liked post successfully!');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Fetch error:', error);
        setSnackbarMessage(`Error: ${error.message}`);
        setSnackbarOpen(true);
      }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem("profileUser", JSON.stringify(currentUser));
          return;
        }

        const savedUser = localStorage.getItem("profileUser");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          return;
        }

        if (!token) {
          setError('Vui lòng đăng nhập để xem hồ sơ.');
          return;
        }

        const response = await fetch('/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch profile data.');
        const data = await response.json();
        setUser(data.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    getProfilePost(); // fetch posts
  }, [currentUser]);

    if (loading) {
        return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" color="text.secondary" align="center">
            Đang tải hồ sơ...
            </Typography>
        </Container>
        );
    }

    if (error || !user) {
        return (
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // Ensures full viewport height for vertical centering
        }}
        >
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" color="text.secondary" align="center">
            Please login to view profile.
            </Typography>
        </Container>
        </Box>
        );
    }
    const profileData = {
    ...user,
    name: user.username,
    };
  return (
    <Container maxWidth="lg" sx={{ bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      {/* Cover Photo Section */}
      <Box
        sx={{
          position: 'relative',
          height: 400,
          bgcolor: 'grey.300',
          backgroundImage: `url(${profileData.coverPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 1,
        }}
      >
        {/* Profile Avatar Overlay */}
        <Avatar
          src={profileData.profilePic}
          alt={profileData.name}
          sx={{
            position: 'absolute',
            bottom: -75,
            left: 24,
            width: 150,
            height: 150,
            border: '4px solid white',
          }}
        />
      </Box>

      {/* User Info Section */}
      <Card
        sx={{
          mt: 8,
          mb: 4,
          pt: 8,
          pb: 3,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            {profileData.name}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 2 }}
            >
              Thêm Vào Tin
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ borderRadius: 2 }}
            >
              Edit profile
            </Button>
          </Stack>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2, px: 3, mb: 2 }}>
          {profileData.bio}
        </Typography>
        <Box sx={{ px: 3 }}>
          <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
            <Chip label={`Công việc: ${profileData.job}`} color="primary" variant="outlined" />
            <Chip label={`Học vấn: ${profileData.education}`} color="secondary" variant="outlined" />
            <Chip label={`Bạn bè: ${profileData.friendsCount}`} color="default" variant="outlined" />
          </Stack>
        </Box>
      </Card>

      {/* Posts Section */}
        <Box sx={{ mt: 2 }}>
          {posts.map((post) => (
              <PostCard key={post._id} post={post} onLike={handleLike} />
          ))}
        </Box>

    </Container>
  );
}

export default Profile
