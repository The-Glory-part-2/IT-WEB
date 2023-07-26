module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'users',
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '회원 고유번호',
      },
      email: {
        type: DataTypes.STRING(100),
        primaryKey: false,
        allowNull: false,
        comment: '사용자 메일주소',
      },
      username: {
        type: DataTypes.STRING(100),
        primaryKey: false,
        allowNull: false,
        comment: '사용자 이름',
      },
      password: {
        type: DataTypes.STRING(200),
        primaryKey: false,
        allowNull: false,
        comment: '사용자 비밀번호',
      },
      // passport 인증에 필요함. 이거 추가 안해서 애먹음
      salt: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '비밀번호 암호화에 사용되는 salt 값',
      },
    },
    {
      timestamps: true,
      paranoid: true,
      timezone: '+09:00'
    }
  );
};
