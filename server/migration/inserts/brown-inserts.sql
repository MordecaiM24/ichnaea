INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Brown University', 'Brown', 'brown', 'Providence, RI', 'City', 146, 13, 5.5, 7349, 65146, 29544, 'Private', 1500, 1530, 1560, 34, 35, 36);
-- Deadline 1 for Brown University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Brown University'), 'regularDecision', '2024-01-06T00:00:00.000Z', 'Regular Decision', '2024-02-02T00:00:00.000Z');
-- Deadline 2 for Brown University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Brown University'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision', '2024-02-02T00:00:00.000Z');
-- Supplemental Essay 1 for Brown University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Brown University'), 'Brown''s Open Curriculum allows students to explore broadly while also diving deeply into their academic pursuits. Tell us about any academic interests that excite you, and how you might pursue them at Brown. (200-250 words)', 250);
-- Supplemental Essay 2 for Brown University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Brown University'), 'Students entering Brown often find that making their home on College Hill naturally invites reflection on where they came from. Share how an aspect of your growing up has inspired or challenged you, and what unique contributions this might allow you to make to the Brown community. (200-250 words)', 250);
-- Supplemental Essay 3 for Brown University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Brown University'), 'Brown students care deeply about their work and the world around them. Students find contentment, satisfaction, and meaning in daily interactions and major discoveries. Whether big or small, mundane or spectacular, tell us about something that brings you joy. (200-250 words)', 250);
-- Supplemental Essay 4 for Brown University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Brown University'), 'What three words best describe you? (3 words)*', 3);
-- Supplemental Essay 5 for Brown University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Brown University'), 'What is your most meaningful extracurricular commitment, and what would you like us to know about it? (100 words)', 100);
-- Supplemental Essay 6 for Brown University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Brown University'), 'If you could teach a class on any one thing, whether academic or otherwise, what would it be? (100 words)', 100);
-- Supplemental Essay 7 for Brown University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Brown University'), 'In one sentence, Why Brown? (50 words)*', 50);
