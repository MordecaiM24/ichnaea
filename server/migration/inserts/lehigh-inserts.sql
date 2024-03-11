INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Lehigh University', 'Lehigh', 'lehigh', 'Bethlehem, PA', 'City', 2355, 47, 46, 5624, 62180, 32698, 'Private', 1350, 1410, 1480, 30, 31, 33);
-- Deadline 1 for Lehigh University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Lehigh University'), 'regularDecision', '2024-01-02T00:00:00.000Z', 'Regular Decision', '2024-01-16T00:00:00.000Z');
-- Deadline 2 for Lehigh University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Lehigh University'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision I', '2023-11-02T00:00:00.000Z');
-- Deadline 3 for Lehigh University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Lehigh University'), 'earlyDecision2', '2024-01-02T00:00:00.000Z', 'Early Decision II', '2024-01-02T00:00:00.000Z');
-- Supplemental Essay 1 for Lehigh University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Lehigh University'), 'How did you first learn about Lehigh University and what motivated you to apply?', 150);
-- Supplemental Essay 2 for Lehigh University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Lehigh University'), '1. What would you want to be different in your own community (local, school, religious, academic, etc.) or the broader global community to further principles of equality or equity?', 300);
-- Supplemental Essay 3 for Lehigh University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Lehigh University'), '2. What factors have most shaped who you are and what you believe today? You might discuss an obstacle that you have overcome or an experience that has inspired you.', 300);
-- Supplemental Essay 4 for Lehigh University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Lehigh University'), '3. Share with us a part of your personal background, perspective, experience or academic interest that has shaped you as a person and that would uniquely add to the Lehigh community.', 300);
