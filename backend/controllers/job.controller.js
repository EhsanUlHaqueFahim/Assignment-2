export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const locationFilter = req.query.location || "";
        console.log('Backend received keyword:', keyword, 'location:', locationFilter);
        
        // Build search query
        let query = {};
        
        if (keyword.trim()) {
            query.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { requirements: { $regex: keyword, $options: "i" } }
            ];
        }
        
        if (locationFilter.trim()) {
            query.location = { $regex: locationFilter, $options: "i" };
        }

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        console.log('Found', jobs.length, 'jobs');

       
        const processedJobs = [];
        
        
        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i].toObject();
            let relevanceScore = 0;
            const matchedKeywords = [];
            
            
            if (keyword.trim()) {
                
                const searchTerms = keyword.toLowerCase().split(" ");
                
                for (let j = 0; j < searchTerms.length; j++) {
                    const term = searchTerms[j].trim();
                    if (!term) continue;
                    
                    // Check title
                    if (job.title.toLowerCase().includes(term)) {
                        relevanceScore += 3;
                        matchedKeywords.push(term);
                    }
                    
                    // Check description
                    if (job.description.toLowerCase().includes(term)) {
                        relevanceScore += 2;
                        if (!matchedKeywords.includes(term)) {
                            matchedKeywords.push(term);
                        }
                    }
                    
                    
                    if (job.requirements && Array.isArray(job.requirements)) {
                        for (let k = 0; k < job.requirements.length; k++) {
                            if (job.requirements[k].toLowerCase().includes(term)) {
                                relevanceScore += 1;
                                if (!matchedKeywords.includes(term)) {
                                    matchedKeywords.push(term);
                                }
                                break; 
                            }
                        }
                    }
                    
                   
                    if (job.location.toLowerCase().includes(term)) {
                        relevanceScore += 2;
                        if (!matchedKeywords.includes(term)) {
                            matchedKeywords.push(term);
                        }
                    }
                }
            }
            
            
            job.relevanceScore = relevanceScore;
            job.matchedKeywords = matchedKeywords;
            processedJobs.push(job);
        }
        
        if (keyword.trim()) {
            processedJobs.sort((a, b) => b.relevanceScore - a.relevanceScore);
        }

        return res.status(200).json({
            jobs: processedJobs,
            success: true
        });
        
    } catch (error) {
        console.log('Error in getAllJobs:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}