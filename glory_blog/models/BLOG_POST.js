module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
    'BLOG_POST',
    {
        POST_ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '블로그 포스트 고유번호',
        },
        CATEGORY_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '블로그 카테고리 고유번호(FK)'
        },
        TITLE: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: '포스트 제목'
        },
        CONTENTS: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: '포스트 내용'
        },
        VIEW_COUNT: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '조회수'
        },
        HASH_TAG: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '해시태그'
        },
        REG_DATE: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '등록일시'
        }
    },
    {
        sequelize,
        tableName: 'BLOG_POST',
        timestamps: true,
        comment: '포스트',
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'POST_ID' }]
          }
        ]
      });
    };