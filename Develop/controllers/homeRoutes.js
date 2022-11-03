const router = require('express').Router();
const {User, Post, Comment} = require('../models');
const sequelize = require('../config/connection');
const session = require('express-session');

router.get('/', async (req, res) => {
  try {
    const PostData = await Post.findAll({
      attributes: ['id', 'title', 'post_text'],
      include: [
        {
          model: User,
          attributes: ['name']
        }]
      });
        const posts = PostData.map((post) => 
        post.get({plain: true})
        );
        res.render('homepage', {
          posts,
        logged_in: req.session.logged_in,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const PostData = await Post.findOne({
      where: {id: req.params.id},
      attributes: ['id', 'title', 'post_text'],
      include: [
        {
          model: User,
          attributes: ['name']
        },
        { 
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id'],
          include: { 
              model: User,
              attributes: ['name']
          }
        }
      ]
    });
    const posts = PostData.get({ plain: true });
    res.render('post', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/dashboard', async (req, res) => {
 try{ 
    const userData = await User.findOne({
      // attributes: { exclude: ['password'] },
      where: {id: req.session.user_id},
      include:[
        {
          model: Post,
          attributes: ['id', 'title', 'post_text']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text'],
          include: {
            model: Post,
            attributes: ['title']
          }
        }
      ]
    });
      const user =userData.get({ plain: true });
      console.log(user)
      res.render('dashboard', {
        ...user,
        logged_in: true
      })
    } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;
  