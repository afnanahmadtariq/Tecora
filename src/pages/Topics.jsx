import { FiExternalLink, FiAward, FiCompass, FiArrowLeft } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchPosts } from "../api/posts";

// Mock data definitions for Topics list (Still static as no endpoint exists provided/found)
const TRENDY_TOPICS = ["Programming", "Digital Marketing", "Artificial Intelligence", "Web Development", "UI/UX Design"];
const SPECIALIZED_TOPICS = ["Website designing", "Mockups", "React Development", "WordPress"];

export default function Topics() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentTopic = searchParams.get("topic");
  const isAllTopics = !currentTopic || currentTopic === 'all';
  
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load questions when a topic is selected
  useEffect(() => {
    if (isAllTopics) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const allPosts = await fetchPosts(); // Fetch from backend
        // Filter by topic
        const filtered = allPosts.filter(q => 
          (q.tags && q.tags.some(tag => tag.toLowerCase().includes(currentTopic.toLowerCase()))) ||
          (q.title && q.title.toLowerCase().includes(currentTopic.toLowerCase()))
        );
        setQuestions(filtered);
      } catch (error) {
         console.error("Failed to load topic posts", error);
         setQuestions([]); 
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentTopic, isAllTopics]);


  const handleTopicClick = (topic) => {
    navigate(`/topics?topic=${encodeURIComponent(topic)}`);
  };

  if (isAllTopics) {
    return (
      <div className="p-4 md:p-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Browse Topics
          </h1>
          <p className="text-muted-foreground">
            Discover the latest discussions and trends in the tech world.
          </p>
        </div>

        <div className="grid gap-12">
          {/* Trendy Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                 <FiAward className="w-6 h-6 text-red-500" />
               </div>
               <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Trendy Topics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {TRENDY_TOPICS.map((topic) => (
                <div 
                  key={topic}
                  onClick={() => handleTopicClick(topic)}
                  className="group bg-white dark:bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-lg hover:border-red-200 dark:hover:border-red-900 transition-all cursor-pointer flex flex-col justify-between h-32"
                >
                  <h3 className="font-semibold text-lg group-hover:text-red-500 transition-colors">{topic}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">250+ posts</span>
                    <span className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                      <FiExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialized Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                 <FiCompass className="w-6 h-6 text-blue-500" />
               </div>
               <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Specialized for You</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SPECIALIZED_TOPICS.map((topic) => (
                <div 
                  key={topic}
                  onClick={() => handleTopicClick(topic)}
                  className="group bg-white dark:bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900 transition-all cursor-pointer flex flex-col justify-between h-32"
                >
                  <h3 className="font-semibold text-lg group-hover:text-blue-500 transition-colors">{topic}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">120+ posts</span>
                    <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <FiExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Specific Topic View
  return (
    <div className="p-4 md:p-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <button 
        onClick={() => navigate('/topics?topic=all')}
        className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <FiArrowLeft className="mr-1" />
        Back to all topics
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent capitalize">
          {currentTopic}
        </h1>
        <p className="text-sm text-muted-foreground mt-1 capitalize">
          Topics &gt; {currentTopic}
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {["All", "New Posts", "Most Replied", "Unanswered"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              selectedFilter === filter
                ? "bg-blue-500 text-white shadow-md shadow-blue-500/20"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Feed */}
      {loading ? (
         <div className="space-y-4">
           {[1, 2, 3].map(i => (
             <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
           ))}
         </div>
      ) : (
        <div className="space-y-4">
          {questions.length > 0 ? questions.map((question) => (
            <div
              key={question.id}
              className="bg-white dark:bg-card border border-blue-100 dark:border-gray-700 p-6 rounded-xl hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                          tag.toLowerCase().includes(currentTopic.toLowerCase())
                           ? "text-blue-600 bg-blue-100 dark:bg-blue-900/40 border border-blue-200"
                           : "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 
                    onClick={() => navigate(`/post/${question.id}`)}
                    className="text-lg font-semibold text-gray-900 dark:text-white leading-tight hover:text-blue-500 transition-colors cursor-pointer"
                  >
                    {question.title}
                  </h3>
                  
                  <p className="text-xs text-gray-400 font-medium">
                    Posted on {question.date}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="text-xs font-medium px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                    {question.replies} Replies
                  </span>
                  <button 
                    onClick={() => navigate(`/post/${question.id}`)}
                    className="flex items-center gap-1 text-sm font-medium text-red-400 hover:text-red-500 transition-colors"
                  >
                    View Answers
                    <FiExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-12 text-muted-foreground">
               No posts found for this topic yet. Be the first to post!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
