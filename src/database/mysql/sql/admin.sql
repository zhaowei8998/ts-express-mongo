-- `weilun-financial`.admin definition
CREATE TABLE `admin` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    `username` varchar(255) DEFAULT NULL,
    `pwd` varchar(255) DEFAULT NULL,
    `position` varchar(50) DEFAULT NULL COMMENT '职位',
    `status` tinyint(4) DEFAULT NULL COMMENT '状态，1：启用，2：禁用',
    `created` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;