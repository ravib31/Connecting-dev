# Apis

# 1-AuthRouter
-POST/signup
-POST/login
-POST/logout

# 2-ProfileRouter
-GET/profile/views
-PATCH/profile/edit
-PATCH/profile/password

# 3-ConnectionRequestRouter
-POST/request/send/:status/:userId
-POST/request/review/accepted/:requestId
-POST/request/review/rejected/:requestId

# 4-UserRouter
-GET/user/connections
-GET/user/requests
-GET/user/feed - Gets you the profiles of other users on platform

Status: ignore,interested,accepted,rejected