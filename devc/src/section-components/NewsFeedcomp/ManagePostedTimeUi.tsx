import { PostType } from "../Newsfeed";

const ManagePostedTimeUi = ({post}:{post:PostType}) => {
    const getTimeAgo = (date: Date): string => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
        if (diffInSeconds < 60) {
          return `${diffInSeconds} seconds ago`;
        }
    
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
          return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
        }
    
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
          return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
        }
    
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
          return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
        }
    
        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) {
          return `${diffInWeeks} week${diffInWeeks === 1 ? '' : 's'} ago`;
        }
    
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
          return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
        }
    
        // If more than a month, return the formatted date
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      };
    
      const createdAtDate = post.createdAt.toDate();
      const timeAgo = getTimeAgo(createdAtDate);
    
      return <span className="text-xs">{timeAgo}</span>;
}

export default ManagePostedTimeUi
