async function handleSubmit(e){
    e.preventDefault();
    setErrMsg("");
    setStatus("submitting");

    try{
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method : "POST",
        headers : {"Content-Type" : "application/json" },
        credentials: "include",
        body : JSON.stringify({email, password})
      });

      const data = await res.json();

      if(!res.ok) {
        throw new Error(data.error || `Server responded with ${res.status}`);
      }

      localStorage.setItem('wsToken', data.sessionId);
      setUser(data.user)
      setStatus("success");
      navigate("/home");

    }
    catch(error){
      setStatus("error");
      setErrMsg(error.message);
    }
  }