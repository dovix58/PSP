package psp.pos_system.services.Implementation;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import psp.pos_system.security.UsernameToUUID;

import java.util.UUID;

@Service
public class AuthService {


    public UUID getLoggedUserID(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null){
            if(authentication.getPrincipal() instanceof UserDetails user){
                return UsernameToUUID.resolveUserId(user.getUsername());

            }


        }
        throw new RuntimeException("User not logged in");
    }


}
