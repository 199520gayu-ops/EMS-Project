const handleResetPassword = () => {
  setFpMsg("");

  if (!fpEmail || !oldPass || !newPass || !confirmPass) {
    setFpMsg("All fields are required");
    return;
  }

  if (newPass !== confirmPass) {
    setFpMsg("New passwords do not match");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userFound = false;

  users = users.map((u) => {
    if (u.email === fpEmail) {
      userFound = true;

      if (u.password !== oldPass) {
        setFpMsg("Old password is incorrect");
        return u;
      }

      return { ...u, password: newPass };
    }
    return u;
  });

  if (!userFound) {
    setFpMsg("Email not found");
    return;
  }

  localStorage.setItem("users", JSON.stringify(users));
  setFpMsg("Password reset successful ✅");

  setTimeout(() => {
    setShowForgot(false);
    setFpEmail("");
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
    setFpMsg("");
  }, 1500);
};
