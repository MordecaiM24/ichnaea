INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Yale University', 'Yale', 'yale', 'New Haven, CT', 'City', 373, 3, 5.3, 6536, 62250, 15296, 'Private', 1470, 1540, 1560, 33, 35, 35);
-- Deadline 1 for Yale University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Yale University'), 'regularDecision', '2024-01-03T00:00:00.000Z', 'Regular Decision', '2024-02-26T00:00:00.000Z');
-- Deadline 2 for Yale University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Yale University'), 'earlyAction', '2023-11-01T00:00:00.000Z', 'Single-Choice Early Action', '2024-01-03T00:00:00.000Z');
-- Supplemental Essay 1 for Yale University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Yale University'), 'What is it about Yale that has led you to apply? (125 words or fewer)', 125);
-- Supplemental Essay 2 for Yale University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Yale University'), 'What inspires you?', 200);
-- Supplemental Essay 3 for Yale University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Yale University'), 'If you could teach any college course, write a book, or create an original piece of art of any kind, what would it be?', 200);
-- Supplemental Essay 4 for Yale University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Yale University'), 'Other than a family member, who is someone who has had a significant influence on you? What has been the impact of their influence? ', 200);
-- Supplemental Essay 5 for Yale University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Yale University'), 'What is something about you that is not included anywhere else in your application?*', 200);
-- Supplemental Essay 6 for Yale University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Yale University'), 'Reflect on a time you discussed an issue important to you with someone holding an opposing view. Why did you find the experience meaningful? (1/3)', 400);
-- Supplemental Essay 7 for Yale University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Yale University'), 'Reflect on your membership in a community to which you feel connected. Why is this community meaningful to you? You may define community however you like. (2/3)', 400);
-- Supplemental Essay 8 for Yale University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Yale University'), 'Reflect on an element of your personal experience that you feel will enrich your college. How has it shaped you? (3/3)', 400);
