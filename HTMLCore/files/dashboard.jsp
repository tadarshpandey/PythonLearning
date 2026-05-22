<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    // Protect page — redirect to login if no session
    String user = (String) session.getAttribute("username");
    if (user == null) {
        response.sendRedirect("login.html");
        return;
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Dashboard — SecurePortal</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0a0a0f;
      --panel: #111118;
      --border: #1e1e2e;
      --accent: #c9a96e;
      --accent-dim: rgba(201,169,110,0.1);
      --text: #e8e6e0;
      --muted: #6b6879;
    }
    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,169,110,0.05) 0%, transparent 70%);
      pointer-events: none;
    }

    /* Topbar */
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2.5rem;
      border-bottom: 1px solid var(--border);
      background: rgba(10,10,15,0.9);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem;
    }
    .nav-brand .dot {
      width: 8px; height: 8px;
      background: var(--accent);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--accent);
    }
    .nav-user {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .avatar {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: var(--accent-dim);
      border: 1.5px solid var(--accent);
      display: flex; align-items: center; justify-content: center;
      font-weight: 500;
      font-size: 0.85rem;
      color: var(--accent);
    }
    .logout-btn {
      padding: 0.5rem 1.1rem;
      background: transparent;
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--muted);
      font-family: 'DM Sans', sans-serif;
      font-size: 0.84rem;
      cursor: pointer;
      text-decoration: none;
      transition: border-color 0.2s, color 0.2s;
    }
    .logout-btn:hover { border-color: #e07070; color: #e07070; }

    /* Main */
    main {
      max-width: 860px;
      margin: 0 auto;
      padding: 3rem 2rem;
      animation: fadeUp 0.5s ease both;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .welcome-header {
      margin-bottom: 2.5rem;
    }
    .welcome-header .greeting {
      font-size: 0.8rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 0.5rem;
    }
    .welcome-header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      font-weight: 700;
    }
    .welcome-header p {
      color: var(--muted);
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }

    /* Status cards */
    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
    }
    .stat-card::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--accent), transparent);
    }
    .stat-card .label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--muted);
      margin-bottom: 0.6rem;
    }
    .stat-card .value {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem;
      color: var(--text);
    }
    .stat-card .note {
      font-size: 0.78rem;
      color: var(--muted);
      margin-top: 0.3rem;
    }

    /* Session info */
    .session-box {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 1.75rem;
    }
    .session-box h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.05rem;
      font-weight: 400;
      margin-bottom: 1.25rem;
      color: var(--muted);
      letter-spacing: 0.04em;
    }
    .info-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.7rem 0;
      border-bottom: 1px solid var(--border);
      font-size: 0.88rem;
    }
    .info-row:last-child { border-bottom: none; }
    .info-row .key { color: var(--muted); }
    .info-row .val { color: var(--text); font-weight: 500; }
    .badge {
      display: inline-block;
      padding: 0.2rem 0.65rem;
      border-radius: 20px;
      font-size: 0.75rem;
      background: rgba(112,201,160,0.12);
      color: #70c9a0;
      border: 1px solid rgba(112,201,160,0.25);
    }
  </style>
</head>
<body>
  <nav>
    <div class="nav-brand">
      <div class="dot"></div>
      SecurePortal
    </div>
    <div class="nav-user">
      <div class="avatar"><%= user.substring(0,1).toUpperCase() %></div>
      <a href="LogoutServlet" class="logout-btn">Sign Out</a>
    </div>
  </nav>

  <main>
    <div class="welcome-header">
      <div class="greeting">&#x2713; Authenticated</div>
      <h1>Hello, <%= user %>.</h1>
      <p>You are successfully logged into the SecurePortal dashboard.</p>
    </div>

    <div class="cards">
      <div class="stat-card">
        <div class="label">Status</div>
        <div class="value">Active</div>
        <div class="note"><span class="badge">● Online</span></div>
      </div>
      <div class="stat-card">
        <div class="label">Session ID</div>
        <div class="value" style="font-size:0.85rem; font-family:'DM Sans',sans-serif; word-break:break-all;"><%= session.getId().substring(0, 12) %>…</div>
        <div class="note">Truncated for display</div>
      </div>
      <div class="stat-card">
        <div class="label">Login Time</div>
        <div class="value" style="font-size:1rem; font-family:'DM Sans',sans-serif;"><%= new java.util.Date() %></div>
        <div class="note">Server time</div>
      </div>
    </div>

    <div class="session-box">
      <h3>Session Information</h3>
      <div class="info-row">
        <span class="key">Logged in as</span>
        <span class="val"><%= user %></span>
      </div>
      <div class="info-row">
        <span class="key">Session created</span>
        <span class="val"><%= new java.util.Date(session.getCreationTime()) %></span>
      </div>
      <div class="info-row">
        <span class="key">Max inactive interval</span>
        <span class="val"><%= session.getMaxInactiveInterval() / 60 %> minutes</span>
      </div>
      <div class="info-row">
        <span class="key">Authentication status</span>
        <span class="val"><span class="badge">Verified</span></span>
      </div>
    </div>
  </main>
</body>
</html>
