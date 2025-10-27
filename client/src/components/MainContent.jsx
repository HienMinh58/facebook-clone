import  { useEffect, useEffectEvent, useState } from 'react'
import { Box, Avatar, TextField, Button, Divider, Card, CardHeader, CardMedia, CardContent, Typography, Modal, Paper, IconButton, Select, MenuItem, FormControl, Snackbar } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GifIcon from '@mui/icons-material/Gif';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PostCard from './PostCard';
import { usePostStore } from '../store/post';
import { useUserStore } from '../store/user';

const MainContent = () => {
    const { currentUser } = useUserStore();
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [newPost, setNewPost] = useState({
        text: "",
        img: "",
    });
    const { posts, createPost, getPosts, getPostUserName } = usePostStore();
    useEffect(() => {
        getPostUserName();
    }, [getPostUserName]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };
    const action = (
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    const handleCreatePost = async () => {
        setOpen(false);
        const { success, message } = await createPost(newPost);
        setSnackbarMessage(message);
        setSnackbarOpen(true);
        if (success) {
            setNewPost({ text: "", img: "" });
        }
    };

    const handleLike = async (postId) => {
        if(!currentUser?.id) {
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
            })

            const data = response.json();
            

            console.log('Response status:', response.status);
            console.log('Response headers:', [...response.headers.entries()]);
            if (!response.ok) {
                setSnackbarMessage(data.message || `Error: HTTP ${response.status}`);
                setSnackbarOpen(true);
                return;
            }

            await getPostUserName();
            setSnackbarMessage(data.message || 'Liked post successfully!');
            setSnackbarOpen(true);
        } catch(error) {
            console.error('Fetch error:', error);
            setSnackbarMessage(`Error: ${error.message}`);
            setSnackbarOpen(true);
        }
    };

    return (
    <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 2, mb: 0.5}}>
        <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 2, mb: 2}}>
            <Box sx={{ display: 'flex', marginTop: 0, mb: 2, cursor: 'pointer'}} onClick={() => setOpen(true)}>
                <Avatar src="/profile-pic.jpg" />
                <TextField
                    fullWidth
                    placeholder={`What's on your mind, ${currentUser?.username || 'Guest'}?`}
                    sx={{ ml: 2, bgcolor: 'grey.100', borderRadius: 5, cursor: 'pointer' }}
                />
            </Box>
        </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <VideocamIcon sx={{ color: '#f44336', mr: 1 }} />
                    <Typography variant="body2">Live Video</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <PhotoCameraIcon sx={{ color: '#4caf50', mr: 1 }} />
                    <Typography variant="body2">Photo/Video</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <EmojiEmotionsIcon sx={{ color: '#ffeb3b', mr: 1 }} />
                    <Typography variant="body2">Feeling/activity</Typography>
                </Box>
        </Box>
        <Modal open={open} onClose={() => setOpen(false)}>
            <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, p: 2, borderRadius: 2}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Create post</Typography>
                <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src="/profile-pic.jpg" />
                <Box sx={{ ml: 2 }}>
                <Typography>{currentUser.username || 'Guest'}</Typography>
                <FormControl size="small">
                    <Select defaultValue="friends" variant="outlined">
                    <MenuItem value="friends">Friends</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            </Box>
            <TextField fullWidth multiline rows={4}
             placeholder={`What's on your mind, ${currentUser?.username || 'Guest'}?`}
             value={newPost.text} 
             onChange={(e) => setNewPost({ ...newPost, text: e.target.value})} 
             variant="standard" />
            <IconButton sx={{ mt: 1 }}><FormatColorTextIcon color="primary" /></IconButton>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" sx={{ mb: 1 }}>Add to your post</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton><PhotoLibraryIcon color="success" /></IconButton>
                <IconButton><PersonAddIcon color="primary" /></IconButton>
                <IconButton><EmojiEmotionsIcon color="warning" /></IconButton>
                <IconButton><LocationOnIcon color="error" /></IconButton>
                <IconButton><GifIcon /></IconButton>
                <IconButton><MoreHorizIcon /></IconButton>
            </Box>
            <Button variant="contained" onClick={handleCreatePost} fullWidth sx={{ mt: 2 }}>Post</Button>
            </Paper>
        </Modal>
        <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
        action={action}
        />
        <Box sx={{ mt: 2 }}>
            {posts.map((post) => (
                <PostCard key={post._id} post={post} onLike={handleLike} />
            ))}
        </Box>
    </Box>
  )
}

export default MainContent
