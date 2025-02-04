package com.BITbus.BusManagement.JwtUtil;

import com.BITbus.BusManagement.AuthService.MyUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
   @Autowired
   private ApplicationContext context;

   @Autowired
   JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHead = request.getHeader("Authorization");
        String token = null;
        String user = null;
        if(authHead != null && authHead.startsWith("Bearer ")){
            token = authHead.substring(7);
            user = jwtService.extractUserName(token);
        }
       if(user !=null && SecurityContextHolder.getContext().getAuthentication() == null){
           UserDetails userDetails = context.getBean(MyUserDetailService.class).loadUserByUsername(user);
           if(jwtService.validateToken(token,userDetails)){
               UsernamePasswordAuthenticationToken authToken =
                       new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
               authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
               SecurityContextHolder.getContext().setAuthentication(authToken);
           }
       }
       filterChain.doFilter(request,response);
    }
}
