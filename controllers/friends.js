const User=require('../models/user');
expoerts.sendfriendrequest=async (req,res,next)=>{
    const sender=req.userId;
    const receiver=req.params._id;
    try{
        const recipientuser=await User.findById(receiver);
        if (recipientuser.friendsRequests.includes(sender) || recipientuser.friends.includes(sender)){
            const err= new Error('Already friends or request already sent.');
             return next(err);
        }
        recipientuser.friendsRequests.push(sender);
        await recipientuser.save();
        res
        .status(200)
        .json({
            message:"Friend request sent."
        })
    }
    catch (err) {
        err.statuscode(500);
        next(err);
       
    }
};


expoerts.acceptfriendrequest=async (req,res,next)=>{
    const receiver=req.userId;
    const sender=req.params._id;
    try {
    const  receiveruser= await User.findById(receiver);
    const senderuser= await User.findById(sender);

    if (!receiveruser.friendsRequests.includes(senderuser)) {
        return res.status(400).json({ message: "No friend request found." });
    }
    receiveruser.friendsRequests.pop(sender);
    receiveruser.friends.push(sender);

    senderuser.friends.push(receiver);
    await  receiveruser.save();
    await senderuser.save();
    return res.status(200).json({ message: "friend request is accepted" });
    }
    catch (err) {
        err.statuscode(500);
        next(err);
       
    }
};



expoerts.removefriendrequest=async (req,res,next)=>{
    const receiver=req.userId;
    const sender=req.params._id;
    try {
    const  receiveruser= await User.findById(receiver);
    const senderuser= await User.findById(sender);

    if (!receiveruser.friendsRequests.includes(senderuser)) {
        return res.status(400).json({ message: "No friend request found." });
    }
    receiveruser.friendsRequests.pop(sender);
    await  receiveruser.save();
    res
    .status(200)
    .json({
        message:"Friend request is deleted."
    })
}

catch (err) {
    err.statuscode(500);
    next(err);
   
}
};


exports.removefriend =async (req,res,next)=>{
    try{
    const remover= req.userId;
    const friend=req.params._id;
    const removeruser= await User.findById(remover);
   const  friendtoremove=await User.findById(friend);
   
   if (!removeruser.friends.includes(friendtoremove)) {
    return res.status(400).json({ message: "No friend  found." });
}
   removeruser.friends.pop(friend);
   friendtoremove.friends.pop(remover);
   await removeruser.save();
   await friendtoremove.save();
   res.status(200).json({ message: "friend is deleted. " });
    }
    catch (err) {
        err.statuscode(500);
        next(err);
       
    }
}


exports.getFriends = async (req, res,next) => {
    try {
        const userId = req.userId;  // Logged-in user

        const user = await User.findById(userId).populate('friends', '_id firstName lastName email');
        
        res.
        status(200)
        .json({
            friend: user.friends});
    } catch (err) {
        err.statuscode(500);
        next(err);
       
    }
};


exports.getFriendbyId = async (req, res,next) => {
    try {
        
        const friendId=req.params._id;
        const user = await User.findById(friendId);
       if (!user){
        return res.status(404).json({
            message:"friend is not found!."
        })
       }
        
        res.
        status(200)
        .json({
            friend: user});
    } catch (err) {
        err.statuscode(500);
        next(err);
       
    }
};