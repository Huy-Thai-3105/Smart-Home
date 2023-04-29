export function getCookie(name) {
    const cookieString = decodeURIComponent(document.cookie);
    const cookies = cookieString.split(";");
  
    for(let i = 0; i < cookies.length; i++) {
      const cookieParts = cookies[i].split("=");
      const cookieName = cookieParts[0].trim();
  
      if(cookieName === name) {
        const cookieValue = cookieParts[1];
        return cookieValue;
      }
    }
  
    // Trả lại giá trị null nếu không tìm thấy cookie với tên này
    return null;
  }