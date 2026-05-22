package com.auth;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;

/**
 * LoginServlet — handles POST /LoginServlet
 * Validates credentials, creates a session, and redirects accordingly.
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    // -----------------------------------------------------------------------
    // Hard-coded demo credentials (replace with DB lookup in production)
    // -----------------------------------------------------------------------
    private static final String VALID_USERNAME = "admin";
    private static final String VALID_PASSWORD = "admin123";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String remember = request.getParameter("remember");  // "on" or null

        // Basic null-safety
        if (username == null || password == null) {
            response.sendRedirect("login.html?error=missing");
            return;
        }

        username = username.trim();

        if (VALID_USERNAME.equals(username) && VALID_PASSWORD.equals(password)) {

            // ---------- Successful login ----------

            // Invalidate any old session first (session fixation protection)
            HttpSession oldSession = request.getSession(false);
            if (oldSession != null) {
                oldSession.invalidate();
            }

            // Create a fresh session
            HttpSession session = request.getSession(true);
            session.setAttribute("username", username);
            session.setAttribute("loginTime", System.currentTimeMillis());

            // Adjust session timeout based on "remember me"
            if ("on".equals(remember)) {
                session.setMaxInactiveInterval(7 * 24 * 60 * 60); // 7 days
            } else {
                session.setMaxInactiveInterval(30 * 60); // 30 minutes
            }

            // Redirect to the protected dashboard
            response.sendRedirect("dashboard.jsp");

        } else {

            // ---------- Failed login ----------
            response.sendRedirect("login.html?error=invalid");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // GET requests not allowed for login; redirect to login page
        response.sendRedirect("login.html");
    }
}
