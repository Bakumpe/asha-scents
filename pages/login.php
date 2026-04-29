<!-- Login Page -->
<?php
session_start();

// Redirect already-authenticated users
if (isset($_SESSION['user_id'])) {
    header("Location: ../index.html");
    exit();
}

// Credentials (replace with DB lookup + password_hash in production)
$valid_username = "admin";
$valid_password_hash = password_hash("password123", PASSWORD_BCRYPT);

$flash = '';
$flash_type = 'error';

// Handle POST login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username === $valid_username && password_verify($password, $valid_password_hash)) {
        session_regenerate_id(true);
        $_SESSION['user_id'] = 1;
        $_SESSION['username'] = $username;
        header("Location: ../index.html");
        exit();
    } else {
        $flash = 'Invalid username or password.';
    }
}

// Flash messages from redirects
$notices = [
    'logged_out'    => ['type' => 'success', 'text' => 'You have been logged out successfully.'],
    'access_denied' => ['type' => 'error',   'text' => 'Please log in to access that page.'],
];
$notice_key = $_GET['notice'] ?? '';
if (empty($flash) && isset($notices[$notice_key])) {
    $flash      = $notices[$notice_key]['text'];
    $flash_type = $notices[$notice_key]['type'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In | MistryScents</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/login.css">
</head>
<body>
<div class="card">

    <div class="login-brand">Mistry<em>Scents</em></div>
    <div class="login-eyebrow">Member Access</div>

    <h1>Welcome back</h1>
    <p class="login-sub">Sign in to your account to continue.</p>
    <div class="divider"></div>

    <?php if ($flash): ?>
        <div class="flash <?= $flash_type ?>">
            <?= htmlspecialchars($flash) ?>
        </div>
    <?php endif; ?>

    <form method="POST" action="login.php">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" autocomplete="username" required
               value="<?= htmlspecialchars($_POST['username'] ?? '') ?>">

        <label for="password">Password</label>
        <input type="password" id="password" name="password" autocomplete="current-password" required>

        <button type="submit">Sign In</button>
    </form>

    <p class="login-footer">
        <a href="../index.html">← Back to store</a>
    </p>
</div>
</body>
</html>