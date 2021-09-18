import React from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltIconOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { Typography } from '@material-ui/core'
export default function Likes({ likes, user, className }) {
    const totalLikes = likes.length;
    const otherLikes = totalLikes - 1;
    const likeText = (totalLikes === 1) ? 'You like this' : `You and ${otherLikes} ${otherLikes === 1 ? 'other' : 'others'} like this`;
    if (totalLikes > 0) {
        if (likes.find(like => (like === user?._id || like === user?.googleId))) {

            return (<>
                <ThumbUpAltIcon fontSize='small' />
                <Typography className={className}>
                    &nbsp;{likeText}&nbsp;
                </Typography>
            </>)
        } else {
            return (<>
                <ThumbUpAltIconOutlined fontSize='small' />
                <Typography className={className}>
                    &nbsp;{totalLikes}&nbsp;{totalLikes !== 1 ? 'Likes' : 'Like'}&nbsp;
                </Typography>
            </>)
        }
    } else {
        return <>
            <ThumbUpAltIconOutlined fontSize='small' />
            <Typography className={className}>
                &nbsp;Like&nbsp;
            </Typography>
        </>
    }
}
