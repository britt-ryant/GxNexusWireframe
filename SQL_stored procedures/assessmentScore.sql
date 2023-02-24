CREATE DEFINER=`root`@`localhost` PROCEDURE `assessmentScore`(
IN tableName VARCHAR(255),
IN assessmentName VARCHAR(255)
)
BEGIN
	SET @SQL = CONCAT('SELECT * FROM ', tableName, ' WHERE AssessmentName=', QUOTE(assessmentName));
    PREPARE stmt FROM @SQL;
    EXECUTE stmt;
END