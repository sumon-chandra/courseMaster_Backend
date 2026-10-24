const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");
const connectDB = require("./src/config/db");
const User = require("./src/models/User");
const Course = require("./src/models/Course");
const Enrollment = require("./src/models/Enrollment");
const QuizSubmission = require("./src/models/QuizSubmission");
const AssignmentSubmission = require("./src/models/AssignmentSubmission");

const seedDatabase = async () => {
  try {
    console.log("Connecting to Database...");
    await connectDB();

    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});
    await QuizSubmission.deleteMany({});
    await AssignmentSubmission.deleteMany({});

    console.log("Seeding Users...");
    const adminPassword = await bcrypt.hash("admin123", 10);
    const studentPassword = await bcrypt.hash("student123", 10);

    const adminUser = await User.create({
      name: "Super Admin",
      email: process.env.ADMIN_EMAIL || "admin@coursemaster.com",
      passwordHash: adminPassword,
      role: "admin",
    });

    const instructorUser = await User.create({
      name: "Jhankar Mahbub",
      email: "instructor@coursemaster.com",
      passwordHash: adminPassword,
      role: "admin",
    });

    const student1 = await User.create({
      name: "Rahim Chowdhury",
      email: "student@coursemaster.com",
      passwordHash: studentPassword,
      role: "student",
    });

    const student2 = await User.create({
      name: "Tamim Hasan",
      email: "tamim@gmail.com",
      passwordHash: studentPassword,
      role: "student",
    });

    const student3 = await User.create({
      name: "Sumaiya Akter",
      email: "sumaiya@gmail.com",
      passwordHash: studentPassword,
      role: "student",
    });

    const student4 = await User.create({
      name: "Nusrat Jahan",
      email: "nusrat@gmail.com",
      passwordHash: studentPassword,
      role: "student",
    });

    console.log("Seeding Courses...");
    const course1 = await Course.create({
      title: "Complete Web Development Masterclass with Next.js & React 19",
      description: "Master modern web development from HTML/CSS to advanced React 19, Next.js App Router, Express, and MongoDB. Includes hands-on real-world projects, live classes, quizzes, and code reviews.",
      instructorName: "Jhankar Mahbub",
      price: 5000,
      category: "Web Development",
      tags: ["React", "Next.js", "JavaScript", "Fullstack", "Node.js"],
      batches: [
        { name: "Batch 1 (Spring 2026)", startDate: new Date("2026-01-10") },
        { name: "Batch 2 (Summer 2026)", startDate: new Date("2026-06-01") },
      ],
      syllabus: [
        {
          title: "Module 1: Modern HTML, CSS & Responsive Design",
          lessons: [
            {
              title: "Lesson 1: Introduction to HTML5 & Semantic Elements",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              liveClassLink: "https://meet.google.com/abc-defg-hij",
              liveClassDate: new Date("2026-04-15T18:00:00.000Z"),
              quiz: [
                {
                  question: "Which HTML5 tag is used to specify a header for a document or section?",
                  options: ["<section>", "<header>", "<head>", "<top>"],
                  correctIndex: 1,
                },
                {
                  question: "What is the correct HTML element for inserting a line break?",
                  options: ["<break>", "<lb>", "<br>", "<line>"],
                  correctIndex: 2,
                },
              ],
            },
            {
              title: "Lesson 2: Flexbox & Grid Layouts Deep Dive",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              assignmentPrompt: "Build a fully responsive pricing card layout using CSS Flexbox and Grid. Submit your GitHub repository URL or live link.",
            },
          ],
        },
        {
          title: "Module 2: React 19 & State Management",
          lessons: [
            {
              title: "Lesson 1: React 19 Components, Props & Hooks",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              quiz: [
                {
                  question: "Which hook is used for handling side effects in React?",
                  options: ["useState", "useMemo", "useEffect", "useCallback"],
                  correctIndex: 2,
                },
              ],
            },
            {
              title: "Lesson 2: Redux Toolkit & Global State",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              assignmentPrompt: "Implement a persistent shopping cart using Redux Toolkit and LocalStorage. Submit your code repo link.",
            },
          ],
        },
      ],
    });

    const course2 = await Course.create({
      title: "Python for Data Science & Machine Learning",
      description: "Learn Python programming, NumPy, Pandas, Matplotlib, and Scikit-Learn to solve real-world data science problems and build predictive machine learning models.",
      instructorName: "Dr. Anisul Islam",
      price: 4500,
      category: "Data Science",
      tags: ["Python", "Machine Learning", "Data Science", "Pandas", "AI"],
      batches: [
        { name: "Batch 1 (2026)", startDate: new Date("2026-02-01") },
      ],
      syllabus: [
        {
          title: "Module 1: Python Fundamentals & Data Structures",
          lessons: [
            {
              title: "Lesson 1: Lists, Dictionaries, and Control Flow",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              quiz: [
                {
                  question: "How do you define a function in Python?",
                  options: ["func myFunc():", "def myFunc():", "function myFunc()", "define myFunc():"],
                  correctIndex: 1,
                },
              ],
            },
            {
              title: "Lesson 2: Exploratory Data Analysis with Pandas",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              assignmentPrompt: "Analyze the provided CSV dataset using Pandas and generate summary statistics and charts.",
            },
          ],
        },
      ],
    });

    const course3 = await Course.create({
      title: "Cross-Platform Mobile Development with Flutter & Dart",
      description: "Build beautiful, high-performance native iOS and Android apps using Flutter framework and Dart programming language.",
      instructorName: "Sumit Saha",
      price: 4000,
      category: "Mobile App",
      tags: ["Flutter", "Dart", "Mobile", "Android", "iOS"],
      batches: [
        { name: "Batch 1 (2026)", startDate: new Date("2026-03-01") },
      ],
      syllabus: [
        {
          title: "Module 1: Flutter Basics & Widget Tree",
          lessons: [
            {
              title: "Lesson 1: Stateless vs Stateful Widgets",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              quiz: [
                {
                  question: "Which widget is immutable in Flutter?",
                  options: ["StatefulWidget", "StatelessWidget", "InheritedWidget", "DynamicWidget"],
                  correctIndex: 1,
                },
              ],
            },
            {
              title: "Lesson 2: Flutter Navigation & Forms",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              assignmentPrompt: "Build a multi-screen login and registration flow with form validation in Flutter.",
            },
          ],
        },
      ],
    });

    const course4 = await Course.create({
      title: "Fullstack AI Engineering & Agentic Workflow Systems",
      description: "Learn to build production-ready LLM-powered applications, AI agents, RAG pipelines, and tool-augmented workflows using TypeScript and Python.",
      instructorName: "Jhankar Mahbub",
      price: 6000,
      category: "Artificial Intelligence",
      tags: ["AI", "LLM", "Agents", "LangChain", "VectorDB"],
      batches: [
        { name: "Batch 1 (2026)", startDate: new Date("2026-04-01") },
      ],
      syllabus: [
        {
          title: "Module 1: Prompt Engineering & Embeddings",
          lessons: [
            {
              title: "Lesson 1: Semantic Search & Vector Embeddings",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              quiz: [
                {
                  question: "What metric is most commonly used to measure distance between vector embeddings?",
                  options: ["Cosine Similarity", "Hamming Distance", "Jaccard Index", "Levenshtein Distance"],
                  correctIndex: 0,
                },
              ],
            },
            {
              title: "Lesson 2: Building your first RAG Pipeline",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              assignmentPrompt: "Create a question-answering assistant over your custom PDF documents using vector search.",
            },
          ],
        },
      ],
    });

    console.log("Seeding Enrollments...");
    const c1Lesson1Id = course1.syllabus[0].lessons[0]._id;
    const c1Lesson2Id = course1.syllabus[0].lessons[1]._id;
    const c1Lesson3Id = course1.syllabus[1].lessons[0]._id;

    const c2Lesson1Id = course2.syllabus[0].lessons[0]._id;
    const c2Lesson2Id = course2.syllabus[0].lessons[1]._id;

    const c3Lesson1Id = course3.syllabus[0].lessons[0]._id;
    const c3Lesson2Id = course3.syllabus[0].lessons[1]._id;

    // Student 1 Enrollments
    await Enrollment.create({
      student: student1._id,
      course: course1._id,
      batchId: course1.batches[0]._id,
      progress: {
        completedLessons: [c1Lesson1Id, c1Lesson2Id],
        percent: 50,
      },
    });

    await Enrollment.create({
      student: student1._id,
      course: course2._id,
      batchId: course2.batches[0]._id,
      progress: {
        completedLessons: [c2Lesson1Id],
        percent: 50,
      },
    });

    // Student 2 Enrollments
    await Enrollment.create({
      student: student2._id,
      course: course1._id,
      batchId: course1.batches[0]._id,
      progress: {
        completedLessons: [c1Lesson1Id],
        percent: 25,
      },
    });

    await Enrollment.create({
      student: student2._id,
      course: course3._id,
      batchId: course3.batches[0]._id,
      progress: {
        completedLessons: [c3Lesson1Id, c3Lesson2Id],
        percent: 100,
      },
    });

    // Student 3 Enrollments
    await Enrollment.create({
      student: student3._id,
      course: course1._id,
      batchId: course1.batches[1]._id,
      progress: {
        completedLessons: [],
        percent: 0,
      },
    });

    await Enrollment.create({
      student: student3._id,
      course: course4._id,
      batchId: course4.batches[0]._id,
      progress: {
        completedLessons: [course4.syllabus[0].lessons[0]._id],
        percent: 50,
      },
    });

    // Student 4 Enrollments
    await Enrollment.create({
      student: student4._id,
      course: course2._id,
      batchId: course2.batches[0]._id,
      progress: {
        completedLessons: [c2Lesson1Id, c2Lesson2Id],
        percent: 100,
      },
    });

    console.log("Seeding Quiz Submissions...");
    // Quiz 1: Student 1 on Course 1 Lesson 1
    await QuizSubmission.create({
      student: student1._id,
      course: course1._id,
      lessonId: c1Lesson1Id,
      answers: [1, 2],
      score: 2,
      total: 2,
      percent: 100,
    });

    // Quiz 2: Student 2 on Course 1 Lesson 1
    await QuizSubmission.create({
      student: student2._id,
      course: course1._id,
      lessonId: c1Lesson1Id,
      answers: [1, 0],
      score: 1,
      total: 2,
      percent: 50,
    });

    // Quiz 3: Student 1 on Course 1 Module 2 Lesson 1
    await QuizSubmission.create({
      student: student1._id,
      course: course1._id,
      lessonId: c1Lesson3Id,
      answers: [2],
      score: 1,
      total: 1,
      percent: 100,
    });

    // Quiz 4: Student 2 on Course 3 Lesson 1
    await QuizSubmission.create({
      student: student2._id,
      course: course3._id,
      lessonId: c3Lesson1Id,
      answers: [1],
      score: 1,
      total: 1,
      percent: 100,
    });

    // Quiz 5: Student 4 on Course 2 Lesson 1
    await QuizSubmission.create({
      student: student4._id,
      course: course2._id,
      lessonId: c2Lesson1Id,
      answers: [1],
      score: 1,
      total: 1,
      percent: 100,
    });

    console.log("Seeding Assignment Submissions...");
    // 1. Reviewed Assignment (Course 1, Lesson 2 - student1)
    await AssignmentSubmission.create({
      student: student1._id,
      course: course1._id,
      lessonId: c1Lesson2Id,
      answerType: "link",
      answer: "https://github.com/rahim/pricing-card-assignment",
      status: "reviewed",
      reviewer: adminUser._id,
      reviewNotes: "Great job! Clean responsive layout across mobile and desktop devices.",
      grade: 95,
    });

    // 2. Pending Assignment Submission (Course 1, Lesson 2 - student2) -> For Admin to test grading
    await AssignmentSubmission.create({
      student: student2._id,
      course: course1._id,
      lessonId: c1Lesson2Id,
      answerType: "link",
      answer: "https://github.com/tamim/flexbox-pricing-component",
      status: "submitted",
    });

    // 3. Pending Assignment Submission (Course 2, Lesson 2 - student4) -> For Admin to test grading
    await AssignmentSubmission.create({
      student: student4._id,
      course: course2._id,
      lessonId: c2Lesson2Id,
      answerType: "text",
      answer: "Dataset analysis report completed: cleaned missing values, generated correlation heatmaps and boxplots. Notebook hosted at: https://colab.research.google.com/drive/tamim-analysis",
      status: "submitted",
    });

    // 4. Reviewed Assignment (Course 3, Lesson 2 - student2)
    await AssignmentSubmission.create({
      student: student2._id,
      course: course3._id,
      lessonId: c3Lesson2Id,
      answerType: "link",
      answer: "https://github.com/tamim/flutter-auth-flow",
      status: "reviewed",
      reviewer: instructorUser._id,
      reviewNotes: "Well architected state management and good form validation patterns.",
      grade: 90,
    });

    console.log("Database Seeded Successfully! ✅");
    console.log("-----------------------------------------");
    console.log("Admin Accounts:");
    console.log(`- Super Admin: ${adminUser.email} (Password: admin123)`);
    console.log(`- Instructor:  ${instructorUser.email} (Password: admin123)`);
    console.log("-----------------------------------------");
    console.log("Student Accounts:");
    console.log(`- Student 1:   ${student1.email} (Password: student123)`);
    console.log(`- Student 2:   ${student2.email} (Password: student123)`);
    console.log(`- Student 3:   ${student3.email} (Password: student123)`);
    console.log(`- Student 4:   ${student4.email} (Password: student123)`);
    console.log("-----------------------------------------");
    console.log("Collections Summary:");
    console.log("- Users: 6 documents");
    console.log("- Courses: 4 documents");
    console.log("- Enrollments: 7 documents");
    console.log("- Quiz Submissions: 5 documents");
    console.log("- Assignment Submissions: 4 documents (2 pending review, 2 reviewed)");
    console.log("-----------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedDatabase();
