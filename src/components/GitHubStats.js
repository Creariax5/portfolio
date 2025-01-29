import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export const GitHubStats = ({ username = 'Creariax5' }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();

        // Calculate total lines of code and commits (approximate)
        let totalCommits = 0;
        for (const repo of reposData) {
          const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`);
          const commitHeader = commitsResponse.headers.get('link');
          if (commitHeader) {
            const match = commitHeader.match(/page=(\d+)>; rel="last"/);
            if (match) {
              totalCommits += parseInt(match[1]);
            }
          }
        }

        setStats({
          repositories: reposData.length,
          commits: totalCommits,
          followers: userData.followers
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch GitHub statistics');
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-sm">
      <div className="grid grid-cols-3 gap-8 text-center">
        <div className="space-y-2">
          <div className="text-4xl font-bold text-blue-600 font-mono">
            {stats.repositories}
          </div>
          <div className="text-gray-600">Public Repos</div>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-green-600 font-mono">
            {stats.commits}
          </div>
          <div className="text-gray-600">Total Commits</div>
        </div>
        <div className="space-y-2">
          <div className="text-4xl font-bold text-purple-600 font-mono">
            {stats.followers}
          </div>
          <div className="text-gray-600">Followers</div>
        </div>
      </div>
    </div>
  );
};
