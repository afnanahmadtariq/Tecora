import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPostById } from '../api/posts'; 

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const data = await fetchPostById(postId); 
        setPost(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load post details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getPostDetails();
  }, [postId]);

  useEffect(() => {
    if (window.location.hash === '#answers') {
      const answersSection = document.getElementById('answers');
      if (answersSection) {
        answersSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [postId]);

  if (loading) {
     return (
       <div className="flex items-center justify-center min-h-[50vh]">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
       </div>
     );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-destructive">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold tracking-tight text-foreground">
           Post Details
         </h1>
         <span className="text-sm text-muted-foreground">ID: {postId}</span>
      </div>

      <div className="bg-card text-card-foreground p-8 rounded-xl border border-border shadow-sm">
        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-sm text-muted-foreground mb-6">{new Date(post.date).toLocaleString()}</p>
        
        <div className="text-foreground leading-relaxed space-y-4 mb-8">
          <p>{post.description}</p>
        </div>

        {post.media && (
          <div className="mb-8 rounded-lg overflow-hidden border border-border">
            <img src={post.media} alt="Post media" className="w-full h-auto object-cover" />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {post.tags && post.tags.split(',').map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Answers Section */}
      <div id="answers" className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">Answers</h3>
        {post.answers && post.answers.length > 0 ? (
          <div className="space-y-4">
            {post.answers.map((answer, index) => (
              <div key={index} className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                   <p className="text-sm text-muted-foreground">{new Date(answer.date).toLocaleDateString()}</p>
                   {/* Add author info if available */}
                </div>
                <div className="text-foreground leading-relaxed prose dark:prose-invert max-w-none">
                   {answer.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 rounded-xl p-8 text-center border-2 border-dashed border-border">
            <p className="text-muted-foreground">No answers yet. Be the first to answer!</p>
          </div>
        )}
      </div>
    </div>
  );
}
