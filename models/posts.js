module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'posts',
    {
      post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '게시글 고유번호',
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '게시글 제목',
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '게시글 내용',
      },
      view_count: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false,
        comment: '사용자 비밀번호',
      },
      // 어떤 유저가 특정 글을 썼는지 확인하기 위해 posts에 user 정보를 추가
      // 이 필드가 users 모델의 어떤 키와 관계있다 라는 것을 알려줘야 합니다
      // models 폴더의 index.js 에도 어떤 관계인지 알려줘야합니다
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '게시글 작성자의 회원 고유번호',
        references: {
          model: 'users', // 'users' 테이블과의 연결 설정
          key: 'user_id', // 'users' 테이블의 'user_id' 칼럼과 연결
        },
      },
    },
    {
       timestamps: true,
       paranoid: true,
       timezone: '+09:00'
   });
};




