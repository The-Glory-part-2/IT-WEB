module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
    'BLOG_CATEGORY',
    {
      CATEGORY_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '블로그 카테고리 고유번호'
      },

      CATEGORY_NAME: {
        type: DataTypes.STRING(100),
        primaryKey: false,
        allowNull: false,
        comment: '카테고리명'
      }    
    },
    {
        sequelize,
        tableName: 'BLOG_CATEGORY',
        timestamps: true,
        comment: '카테고리',
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'CATEGORY_ID' }]
          }
        ],
      });
    };