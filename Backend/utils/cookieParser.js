
export function cookieParser(cookieHeader){
  const cookies = {};
  // console.log(cookieHeader);
  if (!cookieHeader) return cookies ;

  cookieHeader.split(';').forEach((pair) => {
    const [key, ...valueParts] = pair.trim().split('=');
    if(!key) return ;
    cookies[key] = decodeURIComponent(valueParts.join('='))
  })

  return cookies;

}

