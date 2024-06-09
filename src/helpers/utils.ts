export const setToken = (token: string) => {
  // set to local storage
  localStorage.setItem("token", token);
};

export const setUser = (user: any) => {
  // set to local storage
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  // get from local storage
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getConsent = () => {
  // get from local storage
  const consent = localStorage.getItem("consent");
  return consent ? JSON.parse(consent) : null;
};

export const setConsent = (consent: any) => {
  // set to local storage
  localStorage.setItem("consent", JSON.stringify(consent));
};

export function checkPasswordStrength(password: any) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const requirements = [
    { regex: /[a-z]/, message: "lowercase letter" },
    { regex: /[A-Z]/, message: "uppercase letter" },
    { regex: /\d/, message: "digit" },
    { regex: /[@$!%*?&]/, message: "special character" },
    { regex: /.{8,}/, message: "at least 8 characters" },
  ];
  let score = 0;
  let message = "";
  requirements.forEach((requirement) => {
    if (requirement.regex.test(password)) {
      score++;
    } else {
      message += ` ${requirement.message},`;
    }
  });
  if (score === requirements.length) {
    message = "Your password is great. Nice work!";
  } else {
    message = `Your password needs ${message.slice(0, -1)}`;
  }
  return { score: (score / requirements.length) * 100, message };
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s+@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const clearTokenAndUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const validatePhone = (phone: string): boolean => {
  return !!phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
};

export default function passwordValidation(password: string) {
  //   add special character
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
}

export function formatNumber(num: number) {
  const absNum = Math.abs(num);

  if (absNum >= 1e9) {
    return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (absNum >= 1e6) {
    return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (absNum >= 1e3) {
    return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    return num.toString();
  }
}

export function isMe(type: string, isPatientSender: boolean) {
  // type = "P - Provider" or "PF - Patient"
  // isPatientSender = true & type = "PF" => true
  // isPatientSender = false & type = "P" => true
  return (
    (!isPatientSender && type === "PF") || (isPatientSender && type === "P")
  );
}

export function getInitial(firstName: string, lastName: string) {
  // Akshay Kumar => AK
  // Akshay => A
  // Kumar => K
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`;
  } else if (firstName) {
    return firstName[0];
  } else if (lastName) {
    return lastName[0];
  } else {
    return "";
  }
}

export function downloadPDF(url: string) {
  const fileName = url.split("/").pop() || "file.pdf";
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
    });
}
