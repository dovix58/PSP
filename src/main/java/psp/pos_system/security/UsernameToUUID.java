package psp.pos_system.security;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class UsernameToUUID {

    private static final Map<String, UUID> map = new HashMap<>();
    static {
        map.put("employee",  UUID.fromString("fc3dc7ef-2e17-406e-818e-1d62e9caef4c"));
        map.put("owner",  UUID.fromString("fc3dc7ef-2e17-406e-818e-1d62e9c69420"));
    }
    public static UUID resolveUserId(String username){
        return map.get(username);
    }
}
