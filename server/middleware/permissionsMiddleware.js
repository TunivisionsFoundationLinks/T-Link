const RoleControleAccess = (req, res, next) => {
  if (req.user.role.Permissions.includes("react")) {
    next(); // User has permission to reacts , proceed to the next middleware or route handler
  } else if (req.user.role.Permissions.includes("share")) {
    next(); // User has permission to share, proceed to the next middleware or route handler
  } else if (req.user.role.Permissions.includes("createPost")) {
    next(); // User has permission to create post, proceed to the next middleware or route
  } else if (req.user.role.Permissions.includes("deletePost")) {
    next(); // User has permission to delete post, proceed to the next middleware
  } else if (req.user.role.Permissions.includes("editPost")) {
    next(); // User has permission to edit post, proceed to the next middleware
  } else if (req.user.role.Permissions.includes("deleteComment")) {
    next(); // User has permission to delete comment, proceed to the next middleware
  } else if (req.user.role.Permissions.includes("editComment")) {
    next(); // User has permission to edit comment, proceed to the next middleware
  } else if (req.role.Permissions.includes("editProfile")) {
    next(); // User has permission to edit profile, proceed to the next middleware
  } else if (req.role.Permissions.includes("ajouterComment")) {
    next(); // User has permission to   edit comment, proceed to the next middleware
  } else if (req.role.Permissions.includes("CreateRole")) {
    next(); // User has permission to create role, proceed to the next middleware
  } else if (req.role.Permissions.includes("deleteRole")) {
    next(); // User has permission to delete role, proceed to the next middleware
  } else if (req.role.Permissions.includes("editeRole")) {
    next(); // User has permission to edit role, proceed to the next middleware
  } else if (req.role.Permissions.includes("CreateChapter")) {
    next(); // User has permission to create chapter, proceed to the next middleware
  } else if (req.role.Permissions.includes("editeChapter")) {
    next(); // User has permission to edit chapter, proceed to the next middleware
  } else if (req.role.Permissions.includes("deleteChapter")) {
    next(); // User has permission to delete chapter, proceed to the next middleware
  } else if (req.role.Permissions.includes("CreateClub")) {
    next(); // User has permission to create club, proceed to the next middleware
  } else if (req.role.Permissions.includes("editeClub")) {
    next(); // User has permission to edite club, proceed to the next middleware
  } else if (req.role.Permissions.includes("deleteClub")) {
    next(); // User has permission to delete club, proceed to the next middleware
  } else if (req.role.Permissions.includes("ajouterScoore")) {
    next(); // User has permission to ajouter scoore, proceed to the next middleware
  } else if (req.role.Permissions.includes("updateScoore")) {
    next(); // User has permission to update scoore, proceed to the next middleware
  }
  else if (req.role.Permissions.includes("remiseScore")){
    next(); // User has permission to remise a zero tous les scoores
  }
  else if (req.role.Permissions.includes("createEvent")){
    next(); // User has permission to create event, proceed to the next middleware
  }else if (req.role.Permissions.includes("editeEvent")){
    next(); // User has permission to edite event
  }else if (req.role.Permissions.includes("deleteEvent")){
    next(); // User has permission to delete event 
  }else if (req.role.Permissions.include("ajouterMembersClub")) {
    next(); // User has permission to send list of User payed the pack 
  }else if (req.role.Permissions.includes("sendBlams")){
    next(); // User has permission to send blam 
  } else if (req.role.Permissions.includes("banMemberClub")){
    next(); // User has permission to 
  }
  
  else {
    res
      .status(403)
      .json({ error: "User does not have permission to ban users" });
  }
};
