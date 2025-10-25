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

const Profile = () => {
    const { currentUser: storeUser } = useUserStore();
    const token = localStorage.getItem('authToken');
    const [user, setUser] = useState(storeUser || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
    const fetchUserProfile = async () => {
      if (storeUser) {
        setUser(storeUser);
        localStorage.setItem("profileUser", JSON.stringify(storeUser));
        setLoading(false);
        return;
      }
    const savedUser = localStorage.getItem("profileUser");
    if (savedUser) {
    setUser(JSON.parse(savedUser));
    setLoading(false);
    return;
    }

      if (!token) {
        setError('Vui lòng đăng nhập để xem hồ sơ.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data.');
        }

        const data = await response.json();
        setUser(data.data); // Extract the user data from the response structure
      } catch (err) {
        setError(err.message || 'An error occurred while fetching profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    }, [storeUser, token]);

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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'medium' }}>
            Posts
        </Typography>

        {profileData?.posts?.length > 0 ? (
            profileData.posts.map((post) => (
            <Card key={post.id} sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}>
                <CardContent sx={{ pb: 2 }}>
                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.5 }}>
                    {post.content}
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                    <Typography>{post.likes} Likes</Typography>
                    <Typography>{post.comments} Comments</Typography>
                    <Typography>{post.timestamp}</Typography>
                </Stack>
                </CardContent>
            </Card>
            ))
        ) : (
            <Typography variant="body2" color="text.secondary">
            No posts.
            </Typography>
        )}
        </Box>

    </Container>
  );
}

export default Profile
