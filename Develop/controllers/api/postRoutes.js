const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const sequelize = require('../../config/connection');
const session = require('express-session');

router.get('/', async (req, res) => {
  try {
    const PostData = await Post.findAll({
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

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
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
    res.render('homepage', { posts, logged_in: req.session.logged_in });
    if (!PostData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.post('/', async (req, res) => {
  try {
    const PostData = await Post.create({
      ...req.body,
      // user_id: req.session.user_id,
    });

    res.status(200).json(PostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res)=>{
  try {
    const PostData = await Post.update(req.body,{
      where: {
        id: req.params.id,
      }
    })
    if (!PostData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  

router.delete('/:id', async (req, res) => {
  try {
    const PostData = await Post.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
