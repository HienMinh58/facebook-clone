import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  IconButton,
  Chip,
  Box
} from '@mui/material';
import {
  ThumbUp,
  ChatBubbleOutline,
  Share,
  MoreVert
} from '@mui/icons-material';
import moment from 'moment'; // For relative timestamp formatting

const PostCard = ({ post, onLike }) => {
  const [liked, setLiked] = useState(false); // Local state for UI like toggle; integrate with backend if needed

  const handleLikeClick = () => {
    setLiked(!liked);
    if (onLike) {
      onLike(post.id); // Call parent handler for actual API interaction
    }
    console.log('Rendered post:', post);
  };

  const handleComment = () => {
    // Placeholder for comment functionality; implement as needed
    console.log('Opening comments for post:', post._id);
  };

  const handleShare = () => {
    // Placeholder for share functionality; implement as needed (e.g., navigator.share)
    console.log('Sharing post:', post._id);
  };

  return (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
      {/* Header: Avatar, Username, Timestamp, and More Options */}
      <CardHeader
        avatar={<Avatar src={post.pfp || ''} />} // Fallback to empty string if no pfp
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={<Typography variant="subtitle1" fontWeight="bold">{post.username || 'Unknown User'}</Typography>}
        subheader={<Typography variant="caption" color="text.secondary">{moment(post.createdAt).fromNow()}</Typography>}
      />

      {/* Content: Post Text */}
      <CardContent>
        <Typography variant="body1">{post.text}</Typography>
      </CardContent>

      {/* Media: Image if available */}
      {post.img && (
        <CardMedia
          component="img"
          height="auto"
          image={post.img}
          alt="Post image"
          sx={{ maxHeight: 400, objectFit: 'contain' }}
        />
      )}

      {/* Footer: Interactions (Likes, Comment, Share) */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1.5, borderTop: 1, borderColor: 'divider' }}>
        <Chip
          label={`${post.likes || 0} likes`}
          size="small"
          color={liked ? 'primary' : 'default'}
          sx={{ mr: 1 }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={handleLikeClick} color={liked ? 'primary' : 'default'}>
            <ThumbUp />
          </IconButton>
          <IconButton onClick={handleComment}>
            <ChatBubbleOutline />
          </IconButton>
          <IconButton onClick={handleShare}>
            <Share />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default PostCard;