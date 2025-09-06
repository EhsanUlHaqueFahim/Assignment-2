import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import notificationRoute from "./routes/notification.route.js";

const app = express();
dotenv.config({});

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

// Test endpoint to verify server is working
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, 'uploads');
console.log('Uploads directory path:', uploadsPath);
app.use('/uploads', express.static(uploadsPath));

// Test endpoint to check if files are accessible
app.get('/test-file/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
    console.log('Testing file access:', filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('File not found:', err.message);
            res.status(404).send('File not found');
        }
    });
});

//API
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/notification", notificationRoute);

const PORT = process.env.PORT || 3000;

// Connect to database and start server
const startServer = async () => {
    try {
        
        console.log('🔄 Connecting to database...');
        await connectDB(); // This uses the Singleton pattern
        
        console.log('✅ Database connected successfully');
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running at port ${PORT}`);
            console.log(`🌐 Server URL: http://localhost:${PORT}`);
        });
        
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        console.log('💀 Server shutting down...');
        process.exit(1); 
    }
};


startServer();