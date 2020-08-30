INSERT INTO posts(title, body, user_id) 
VALUES 
('Admin announcement', 'This API is awesome!', (SELECT id FROM users WHERE username = 'admin')), 
('Just a test', 'This is just a test. I repeat, this is just a test.', (SELECT id FROM users WHERE username = 'admin'));