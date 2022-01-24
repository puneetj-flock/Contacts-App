package com.example.contacts.configuration;

import com.example.contacts.db.AuthDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

@Component
public class AuthInterceptor implements HandlerInterceptor {
  @Autowired
  AuthDB auth;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

    if (Objects.equals(request.getMethod(), "OPTIONS")) {
      return true;
    }

    String sessionToken = request.getHeader("sessionToken");
    System.out.println("Call Intercepted with " + sessionToken + "\n");


//    Integer userId = auth.checkAuth(sessionToken);
//    System.out.println(sessionToken + " " + userId);

//    if (sessionToken == null || userId == null) {
//      response.setStatus(400);
//      System.out.println("Request Failed at interceptor \n");
//      return false;
//    }

//    request.setAttribute("userId", userId);
    return true;
  }

}

// cmd + opt + l
//argument resolvers
//