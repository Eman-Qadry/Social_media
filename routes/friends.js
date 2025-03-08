const express = require('express');
const router=express.Router();
const friendsController=require("../controllers/friends");
const authorization=require("../middleware/is-Auth");
/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: Friend management
 */

/**
 * @swagger
 * /friends/request/{_id}:
 *   post:
 *     summary: Send a friend request
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the user receiving the request
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Friend request sent.
 *       400:
 *         description: Already friends or request already sent.
 *       500:
 *         description: Server error
 */
router.post("/request/:_id",authorization,friendsController.sendfriendrequest);
/**
 * @swagger
 * /friends/accept/{_id}:
 *   post:
 *     summary: Accept a friend request
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the user sending the request
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Friend request accepted.
 *       400:
 *         description: No friend request found.
 *       500:
 *         description: Server error
 */
router.post("/accept/:_id",authorization,friendsController.acceptfriendrequest);

/**
 * @swagger
 * /friends/remove-request/received/{_id}:
 *   delete:
 *     summary: Remove a friend request i received
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the user whose request is being removed
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Friend request removed.
 *       400:
 *         description: No friend request found.
 *       500:
 *         description: Server error
 */
router.delete('/remove-request/received/:_id', authorization,friendsController.removefriendrequestIReceived);

/**
 * @swagger
 * /friends/remove-request/sent/{_id}:
 *   delete:
 *     summary: Remove a friend request i sent
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the user whose I sent request to him
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Friend request removed.
 *       400:
 *         description: No friend request found.
 *       500:
 *         description: Server error
 */
router.delete('/remove-request/sent/:_id', authorization,friendsController.removefriendrequestISent);
/**
 * @swagger
 * /friends/remove/{_id}:
 *   delete:
 *     summary: Remove a friend 
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the friend to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Friend removed.
 *       400:
 *         description: No friend found.
 *       500:
 *         description: Server error
 */
router.delete('/remove/:_id', friendsController.removefriend);

/**
 * @swagger
 * /friends:
 *   get:
 *     summary: Get a list of friends
 *     tags: [Friends]
 *     responses:
 *       200:
 *         description: List of friends.
 *       500:
 *         description: Server error
 */
router.get('/',authorization, friendsController.getFriends);

/**
 * @swagger
 * /friends/{_id}:
 *   get:
 *     summary: Get a friend by ID
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: ID of the friend
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Friend found.
 *       404:
 *         description: Friend not found.
 *       500:
 *         description: Server error
 */
router.get('/:_id', authorization,friendsController.getFriendbyId);

module.exports = router;

module.exports=router;