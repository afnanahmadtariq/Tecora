import { FiExternalLink } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Topics() {
  const [searchParams] = useSearchParams();
  const currentTopic = searchParams.get("topic") || "UI/UX Designing";
  
  const [selectedFilter, setSelectedFilter] = useState("All");const [questions, setQuestions] = useState([]);
  const [trendyTopics, setTrendyTopics] = useState([]);
  const [specializedTopics, setSpecializedTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Here you would typically fetch questions based on `currentTopic`
    console.log("Fetching data for topic:", currentTopic);
  }, [currentTopic]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const fetchedQuestions = await fetchQuestions(); 
        const fetchedTrendyTopics = await fetchTrendyTopics(); 
        const fetchedSpecializedTopics = await fetchSpecializedTopics(); 

        setQuestions(fetchedQuestions);
        setTrendyTopics(fetchedTrendyTopics);
        setSpecializedTopics(fetchedSpecializedTopics);
      } catch (error) {
        console.error("Failed to fetch topics data.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const fetchQuestions = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            {
              id: 1,
              title:
                "What tools can help streamline project management for a remote team?",
              date: "Apr 20, 2024",
              tags: ["Management", "Software Project", "Software Company"],
              replies: 10,
            },
            {
              id: 2,
              title:
                "What are the best practices for optimizing website performance?",
              date: "Apr 20, 2024",
              tags: ["Website", "React", "Software Company"],
              replies: 10,
            },
          ]),
        1000
      )
    );
  };

  const fetchTrendyTopics = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            "Programming",
            "Digital Marketing",
            "Artificial Intelligence",
            "Web Development",
            "UI/UX trends",
          ]),
        1000
      )
    );
  };

  const fetchSpecializedTopics = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            "Website designing",
            "Mockups",
            "React Development",
            "WordPress",
          ]),
        1000
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="p-4 md:p-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent capitalize">
          {currentTopic === 'all' ? 'All Topics' : currentTopic}
        </h1>
        <p className="text-sm text-muted-foreground mt-1 capitalize">
          Projects &gt; {currentTopic === 'all' ? 'All Topics' : currentTopic}
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
      <div className="space-y-4">
        {questions.map((question) => (
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
                      className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight hover:text-blue-500 transition-colors cursor-pointer">
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
                <button className="flex items-center gap-1 text-sm font-medium text-red-400 hover:text-red-500 transition-colors">
                  View Answers
                  <FiExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
