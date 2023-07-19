module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
    'article', {
        article_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '게시글고유번호',
        },
        board_type_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '게시판고유번호 1:공지사항게시판,2:일반사용자 게시판',
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: '글제목',
        },
        contents: {
            type: DataTypes.TEXT, // 긴글 작성 시 활용 
            allowNull: true,
            comment: '글내용',
        },
        view_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '조회수',
        },
        ip_address: {
        type: DataTypes.STRING(50),
            allowNull: false,
            comment: '작성자IP주소',
        },
        article_category_id: {
            type: DataTypes.TINYINT,
            allowNull: false,
            comment: '게시여부 0:게시안함 1:게시함',
        },
        reg_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '등록일시',
        },
        reg_member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '등록자고유번호',
        },
        edit_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '수정일시',
        },
        edit_member_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '수정자고유번호',
        }
        },
        {
            sequelize,
            tableName: 'article', // 따옴표를 사용하면 단수형으로 테이블 이름 명시 가능 
            timestamps: false,
            comment: '게시글정보',
            indexes: [
        {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'article_id' }],
        },
    ],  
    }
);
};