module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        // 기본 테이블 이름 
        'members',
        {
            // 속성을 단일 객체로 지정 - member_id라는 컬럼 설정
            member_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: '회원고유번호',
            },
            // 속성을 단일 객체로 지정 - email이라는 컬럼 설정 
            email: {
                type: DataTypes.STRING(100),
                primaryKey: false,
                allowNull: false,
                comment: '사용자메일주소',
            }
        },
        {
            // 등록일시 컬럼 자동으로 생성 및 물리적인 테이블을 삭제된 것 처럼 보이는 설정 지정
            timestamps: true,
            paranoid: true 
        }
    );
}